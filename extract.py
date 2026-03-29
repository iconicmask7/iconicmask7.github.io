from pypdf import PdfReader

reader = PdfReader("public/SURAJ_S_PILLAI_Resume.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("pdf_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
