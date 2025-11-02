import fontkit from "@pdf-lib/fontkit";
import JSZip from "jszip";
import * as fs from "node:fs/promises";
import { PDFDocument, rgb } from "pdf-lib";
import { PrismaService } from "prisma/prisma.service";

import { Injectable, NotFoundException } from "@nestjs/common";

async function preparePdf(name: string, surname: string, section: string) {
  const template = await fs.readFile("src/certificate/utils/certificate.pdf");
  const fontName = await fs.readFile(
    "src/certificate/utils/SpaceGrotesk-Medium.otf",
  );
  const font = await fs.readFile(
    "src/certificate/utils/SpaceGrotesk-Regular.otf",
  );
  const pdfDocument = await PDFDocument.load(template);
  pdfDocument.registerFontkit(fontkit);
  const colorRgb = rgb(214 / 255, 93 / 255, 33 / 255);
  const customFont1 = await pdfDocument.embedFont(fontName);
  const customFont2 = await pdfDocument.embedFont(font);
  const text1 = `${name} ${surname}`;
  const text2 = section;

  const page = pdfDocument.getPages()[0];

  page.drawText(text1, {
    color: colorRgb,
    font: customFont1,
    size: 40,
    y: 400,
    x: (page.getWidth() - customFont1.widthOfTextAtSize(text1, 40)) / 2,
  });

  page.drawText(text2, {
    color: colorRgb,
    font: customFont2,
    size: 32,
    x: (page.getWidth() - customFont2.widthOfTextAtSize(text2, 32)) / 2,
    y: 230,
  });
  return pdfDocument;
}

@Injectable()
export class CertificateService {
  constructor(private prisma: PrismaService) {}

  async generateCertificates() {
    const zip = JSZip();

    const members = await this.prisma.members.findMany();

    for (const member of members) {
      const pdf = await preparePdf(
        member.name,
        member.surname,
        member.section ?? "",
      );
      const pdfBytes = await pdf.save();
      zip.file(`${member.name}${member.surname}.pdf`, pdfBytes);
    }
    const zipBytes = await zip.generateAsync({ type: "nodebuffer" });
    return zipBytes;
  }

  async generateSpecificCertificate(ids: number[]) {
    const zip = JSZip();

    const members = await this.prisma.members.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    for (const member of members) {
      const pdf = await preparePdf(
        member.name,
        member.surname,
        member.section ?? "",
      );
      const pdfBytes = await pdf.save();
      zip.file(`${member.name}${member.surname}.pdf`, pdfBytes);
    }
    const zipBytes = await zip.generateAsync({ type: "nodebuffer" });
    return zipBytes;
  }

  async generateOneCertificate(member_id: number) {
    const member = await this.prisma.members.findUnique({
      where: { id: member_id },
    });
    if (member == null) {
      throw new NotFoundException("No member with this id found in database");
    }
    const template = await fs.readFile("src/certificate/certificate.pdf");
    const pdfDocument = await PDFDocument.load(template);

    const page = pdfDocument.getPages()[0];

    page.drawText(
      `Certyfikat dla uzytkownika ${member.name} ${member.surname}`,
    );
    return await pdfDocument.save();
  }
}
