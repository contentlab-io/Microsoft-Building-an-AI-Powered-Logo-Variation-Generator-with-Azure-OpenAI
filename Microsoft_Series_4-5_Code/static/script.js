const logoGenerateButton = document.getElementById("logo-generate");
const logoInput = document.getElementById("logo-input");
const logoResults = document.getElementById("logo-results");
const logoText = document.getElementById("logo-text");

logoGenerateButton.addEventListener("click", function () {
    // Disable the input and button
    logoText.disabled = true;
    logoGenerateButton.disabled = true;
    // Change the button text
    logoGenerateButton.textContent = "Generating...";

    // Get the input value
    const text = logoText.value;

    fetch("/logos", {
        method: "POST",
        // send the input value as JSON
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
    .then((response) => response.json())
    .then((data) => {
        // Fade out the input and button
        logoInput.classList.add("opacity-0");
        // Re-enable the input and button
        logoText.disabled = false;
        logoGenerateButton.disabled = false;
        // Reset the button text
        logoGenerateButton.textContent = "Generate";
        // Adjust the input and button styles
        logoInput.classList.remove("flex-col", "items-center", "justify-center", "space-y-4", "mt-20", "opacity-0");
        logoInput.classList.add("flex-row", "justify-between", "mt-4");
        logoText.classList.add("w-3/5");
        logoGenerateButton.classList.add("w-1/3");

        // Clear the results container
        logoResults.innerHTML = "";

        // Loop through each image URL in the data array
        data.forEach((url) => {
            // Create an image element for each URL
            const img = document.createElement("img");
            img.src = url;
            img.alt = "Logo variant";
        // Append the image element to the results container
            logoResults.appendChild(img);
        });

        // Show the results container
        logoResults.classList.remove("hidden");

        // Fade in the input, button, and images
        logoInput.classList.add("opacity-100");
    })
    .catch((error) => {
        // Log any errors to the console
        console.error(error);
    });
});
