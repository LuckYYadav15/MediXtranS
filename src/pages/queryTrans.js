async function query(data) {
    // console.log(data);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/d4data/biomedical-ner-all",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export default query;
