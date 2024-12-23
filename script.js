// Your script here.

const msg = new SpeechSynthesisUtterance();
  let voices = [];

  // DOM Elements
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(
        (voice) =>
          `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
      )
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find((voice) => voice.name === this.value);
  }

  function setOption() {
    msg[this.name] = this.value;
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel(); // Stop any ongoing speech
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach((option) => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));

  populateVoices();

