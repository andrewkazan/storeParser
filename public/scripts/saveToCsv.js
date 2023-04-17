const saveToCsv = async (fileName) => {
    try {
        fetch('save', { method: 'POST', body: JSON.stringify({ fileName }) })
            .then((response) => response.blob())
            .then((blob) => {
                // Create a URL for the CSV file
                const url = URL.createObjectURL(blob);

                // Create a new anchor element
                const a = document.createElement('a');

                // Set the anchor's href and download attributes
                a.href = url;
                a.download = fileName;

                // Append the anchor to the body and trigger a click event
                document.body.appendChild(a);
                a.click();

                // Remove the anchor and revoke the URL when done
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                window.location.href = '/';
            });
    } catch (e) {
        console.error('Error in method get csv prices', e);
    }
};
