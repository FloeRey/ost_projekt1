class LottieService {
  constructor() {
    this.player = document.querySelector("#lottiePlayer");
  }

  play() {
    this.player.play();
  }

  stop() {
    this.player.stop();
  }

  fireOneAnimation() {
    if (!this.isRunning) {
      this.player.classList.toggle("hide");
      this.isRunning = true;
      this.play();
      setTimeout(() => {
        this.player.classList.toggle("hide");
        this.isRunning = false;
        this.stop();
      }, 1000);
    }
  }
}

export default new LottieService();
