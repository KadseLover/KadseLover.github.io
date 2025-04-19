(() => {
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }

    // get the context
    let ctx = canvas.getContext('2d');

    // grid settings
    const rows = 10;
    const cols = 10;

    // calculate grid size dynamically based on canvas size
    const gridSize = Math.min(canvas.width / cols, canvas.height / rows);

    // draw the grid
    function drawGrid(highlightedCell = null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * gridSize;
                const y = row * gridSize;

                // highlight the cell if it's the one under the mouse
                if (highlightedCell && highlightedCell.row === row && highlightedCell.col === col) {
                    ctx.fillStyle = 'lightgray'; // highlight color
                    ctx.fillRect(x, y, gridSize, gridSize);
                    ctx.fillStyle = 'lightblue'; // reset fill color
                } else {
                    ctx.fillStyle = 'lightblue';
                    ctx.fillRect(x, y, gridSize, gridSize);
                }

                ctx.strokeStyle = 'black';
                ctx.strokeRect(x, y, gridSize, gridSize);
            }
        }
    }

    // track mouse movement
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // calculate the cell the mouse is over
        const col = Math.floor(mouseX / gridSize);
        const row = Math.floor(mouseY / gridSize);

        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            drawGrid({ row, col });
        } else {
            drawGrid(); // redraw without highlight if outside grid
        }
    });

    // initial draw
    drawGrid();
})();