async function askCoach() {
  console.log("ASK BUTTON CLICKED ✔");

  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("response");

  responseBox.textContent = "Thinking... 🤖";

  try {
    const res = await fetch("http://127.0.0.1:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    responseBox.textContent = data.reply;

  } catch (error) {
    console.log("ERROR:", error);
    responseBox.textContent = "Server not responding ❌";
  }
}