// Function to download TikTok video without watermark
function downloadVideo(form) {
    event.preventDefault();

    const videoUrl = form.videoUrl.value;
    const videoId = videoUrl.match(/https?:\/\/(?:www\.|vm\.)?tiktok\.com\/(?:\w+\/)?@([\w]+)\/video\/(\d+)/i);

    if(videoId) {
        const downloadUrl = `https://www.tiktok.com/@${videoId[1]}/video/${videoId[2]}`;
        const outputDiv = document.getElementById("output");
        const downloadLink = document.createElement("a");

        downloadLink.href = downloadUrl;
        downloadLink.download = "tiktok_video.mp4";
        downloadLink.innerText = "Download Video";
        outputDiv.innerHTML = "";
        outputDiv.appendChild(downloadLink);
        outputDiv.style.display = "block";
    }
    else {
        alert("URL video TikTok tidak valid.");
    }
}

// Event listener for form submission
const downloadForm = document.getElementById("downloadForm");
downloadForm.addEventListener("submit", function(event) {
    downloadVideo(this);
});
