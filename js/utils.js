(() => {
  /* ==================== RangeDisplay ==================== */

  // Displays the value of a range input
  // Why isn't this in the HTML5 spec?
  class RangeDisplay {
    constructor(input) {
      this.input = input;
      this.output = document.createElement('span');
      this.output.className = 'range-display';
      this.units = this.input.getAttribute('data-units') || '';
      
      // Bind event handlers
      this.update = this.update.bind(this);
      
      // Add event listeners
      this.input.addEventListener('change', this.update);
      this.input.addEventListener('input', this.update);

      // Set initial output
      this.update();

      // Append the output to the parent of the input
      this.input.parentNode.appendChild(this.output);
    }

    update() {
      this.output.textContent = `${this.input.value}${this.units}`;
    }
  }

  /* ==================== init ==================== */

  // Initialize RangeDisplays
  const ranges = document.querySelectorAll('input[type="range"]');
  ranges.forEach(range => new RangeDisplay(range));

})();
