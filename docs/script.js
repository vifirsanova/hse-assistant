document.addEventListener("DOMContentLoaded", function () {
    fetch("content.json")
        .then(response => response.json())
        .then(data => {
            const contentContainer = document.getElementById("content");
            
            data.texts.forEach(item => {
                let p = document.createElement("p");
                p.innerHTML = item.text;
                
                // Apply highlights
                item.highlights.forEach(highlight => {
                    const regex = new RegExp(`\\b(${highlight.word})\\b`, "gi");
                    p.innerHTML = p.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
                });

                // Apply tooltips
                if (item.tooltip) {
                    const regex = new RegExp(`\\b(${item.tooltip.word})\\b`, "gi");
                    p.innerHTML = p.innerHTML.replace(
                        regex,
                        `<span class="nlp-term" tabindex="0">$1<span class="tooltip">${item.tooltip.text}</span></span>`
                    );
                }

                // Apply hypertext with clickable links
                item.hypertext.forEach(hyper => {
                    const regex = new RegExp(`\\b(${hyper.word})\\b`, "gi");
                    p.innerHTML = p.innerHTML.replace(
                        regex,
                        `<a href="#" class="hyperlink">$1</a>`
                    );
                });

                // Append paragraph to the container
                contentContainer.appendChild(p);
            });

            // Add event listeners for hypertext links after DOM update
            document.querySelectorAll(".hyperlink").forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    alert(e.target.textContent); // Show alert with the word clicked
                });
            });
        });
});
