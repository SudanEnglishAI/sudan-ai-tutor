// ================================
// Sudan AI Tutor
// ================================



// ================================
// Ask AI
// ================================
async function askAI() {

    const prompt = document.getElementById("prompt");
    const chatBox = document.getElementById("chatBox");

    const question = prompt.value.trim();

    if (question === "") return;

    // Create User Message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = question;
    chatBox.appendChild(userMsg);

    // Clear textbox
    prompt.value = "";

    // Create AI Message
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.innerHTML = "🤖 <b>Thinking...</b>";
    chatBox.appendChild(aiMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        question: question
    })
});

        const data = await response.json();

        console.log(data);

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
        ) {

            aiMsg.innerHTML = marked.parse(
                data.candidates[0].content.parts[0].text
            );

        } else {

            aiMsg.innerHTML = "❌ No response received.";

        }

    } catch (error) {

        console.error(error);

        aiMsg.innerHTML = "❌ Error connecting to AI.";

    }

    chatBox.scrollTop = chatBox.scrollHeight;
}



// ================================
// Press Enter to Send
// ================================
document.getElementById("prompt").addEventListener("keydown", function(event){

    if(event.key==="Enter" && !event.shiftKey){

        event.preventDefault();

        askAI();

    }

});



// ================================
// New Chat
// ================================
function newChat(){

    document.getElementById("chatBox").innerHTML="";

    document.getElementById("dashboard").style.display="block";

    document.getElementById("prompt").value="";

    document.getElementById("prompt").focus();

}



// ================================
// Dashboard Cards
// ================================
function startSubject(subject){

    document.getElementById("dashboard").style.display="none";

    document.getElementById("prompt").value =
        "Teach me " + subject + " from basic to advanced.";

    askAI();

}