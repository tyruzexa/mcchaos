document.addEventListener('DOMContentLoaded', function () {
    const spinner = document.querySelector('.spinner');
    //const spinBtn = document.querySelector('.spin-btn');
    const resultDiv = document.querySelector('.result');
    const audio = document.getElementById('audioElement');
    let options = [];
    var lastIndex = 0;
    var lastTimestamp = null;

    // Function to load options from the server
    function loadOptions() {
        fetch('/cgi-bin/get-options')
 	.then(response => response.json())
            .then(data => {
                options = data;
                createSegments(data);
            })
            .catch(error => console.error('Error loading options:', error));
    }

    // Function to create spinner segments
    function createSegments(options) {
        const segmentAngle = 360 / options.length;

        options.forEach((option, index) => {
            const segment = document.createElement('div');
            segment.classList.add('spinner-segment');
	    const segmenttxt = document.createElement('div');

            //option.title
            //option.color
            //option.command
            segmenttxt.textContent = option.subtitle;
//            segmenttxt.style.transform = 'rotate(90deg)';
	       segment.style.transform = `rotate(${index * segmentAngle}deg)`;
            //segment.style.backgroundColor = option.color;
	   const segmentbg = document.createElement('div');
		segmentbg.classList.add("spinner-segment-bg");
	 //   segmentbg.style.backgroundColor = option.color;
		segmentbg.textContent=" ";

		segment.appendChild(segmentbg);
		segment.appendChild(segmenttxt);
            spinner.appendChild(segment);
        });
    }


var currentIndex = 0;

var oddness = 1;

var currentIndex = 0;
var oddness = 1;

function fetchRandomNumber() {
    fetch('/number.json')
        .then(response => response.json())
        .then(data => {
            if (data.timestamp !== lastTimestamp) {
                lastTimestamp = data.timestamp;
                const segments = document.querySelectorAll('.spinner-segment');
                segments.forEach(segment => segment.classList.remove('selected'));
                segments.forEach(segment => segment.classList.remove('highlighted'));
                resultDiv.classList.remove('show');
                spin(data.number);
            }
        })
        .catch(error => console.error('Error fetching random number:', error));
}



function spin(targetIndex) {
    const spinDuration = 3000;
    const cycleInterval = 10; // Adjust as needed
    const optionsCount = options.length;

    //var targetIndex = Math.floor(Math.random()*options.length);


    oddness = -oddness
    const spinAngle = oddness * 360; 
    
    // Apply the spinning animation to the spinner
    spinner.style.transition = `transform ${spinDuration}ms ease-out`; // Smooth easing
    spinner.style.transform = `rotate(${spinAngle}deg)`; // Rotate the spinner for the specified angle

    audio.play()

    const highlightInterval = setInterval(() => {
        highlightSegment(currentIndex);
        if (currentIndex == targetIndex) {
            clearInterval(highlightInterval); // Stop cycling
        }
        currentIndex = (currentIndex + 1) % optionsCount; // Cycle through the options

    }, cycleInterval);

    setTimeout(() => {
        clearInterval(highlightInterval); // Stop cycling
        const selectedOption = options[targetIndex];
        resultDiv.innerHTML = `Selected: ${selectedOption.title}<br> ${selectedOption.subtitle}`;
        resultDiv.classList.add('show');
        highlightFinalSegment(targetIndex);
    }, spinDuration);
}

function highlightFinalSegment(index) {
    const segments = document.querySelectorAll('.spinner-segment');
    segments.forEach(segment => segment.classList.remove('selected'));
    segments.forEach(segment => segment.classList.remove('highlighted'));
    segments[index].classList.add('selected');
}

    function highlightSegment(index) {
        const segments = document.querySelectorAll('.spinner-segment');
        segments.forEach(segment => segment.classList.remove('highlighted'));
        segments[index].classList.add('highlighted');
       
    }

    // Load options when the page loads
    loadOptions();
    setInterval(fetchRandomNumber, 50);
});
