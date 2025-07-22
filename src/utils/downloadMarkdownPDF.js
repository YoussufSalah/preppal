// utils/downloadMarkdownPDF.js

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import showdown from "showdown";

export async function downloadMarkdownPDF(markdownContent, filename = "PrepPal-Summary.pdf") {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdownContent);

  // Create a hidden div to render the HTML
  const hiddenDiv = document.createElement("div");
  hiddenDiv.innerHTML = html;
  hiddenDiv.style.position = "absolute";
  hiddenDiv.style.top = "-10000px";
  hiddenDiv.style.width = "800px";
  hiddenDiv.style.padding = "20px";
  hiddenDiv.classList.add("prose"); // Optional: Tailwind Typography
  document.body.appendChild(hiddenDiv);

  const canvas = await html2canvas(hiddenDiv);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);

  document.body.removeChild(hiddenDiv);
}
