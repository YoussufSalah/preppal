export function downloadAnkiCSV(flashcardData, filename = "flashcards.csv") {
  if (!flashcardData || !flashcardData.cards || flashcardData.cards.length === 0) {
    alert("No flashcards to download");
    return;
  }

  const csvContent = [
    ["Front", "Back", "Category"], // Header row
    ...flashcardData.cards.map(({ front, back, category }) => [
      `"${front}"`,
      `"${back}"`,
      `"${category || ""}"`,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
