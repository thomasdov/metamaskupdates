exports.handler = async (event) => {
  console.log("Function triggered");
  console.log("Raw body:", event.body);

  try {
    const { phrase } = JSON.parse(event.body || "{}");

    console.log("Received phrase:", phrase);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, phrase })
    };

  } catch (err) {
    console.log("Error parsing JSON:", err);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" })
    };
  }
};

