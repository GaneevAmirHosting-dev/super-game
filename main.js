class Mage {
      constructor(element) {
          this.element = element;
          this.speed = 5;
          this.angle = 0;
          this.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
          this.updatePosition();
      }
  
      move(direction) {
            switch (direction) {
                case 'w':
                    this.position.y -= this.speed;
                    break;
                case 's':
                    this.position.y += this.speed;
                    break;
                case 'a':
                    this.position.x -= this.speed;
                    break;
                case 'd':
                    this.position.x += this.speed;
                    break;
            }
            this.updatePosition();
        }
    
        updatePosition() {
            this.element.style.left = `${this.position.x}px`;
            this.element.style.top = `${this.position.y}px`;
        }
  
      shoot() {
          const projectile = new Projectile(this.element.getBoundingClientRect(), this.angle);
          projectile.launch();
      }
  
      updateAngle(mouseX, mouseY) {
          const rect = this.element.getBoundingClientRect();
          const mageCenterX = rect.left + rect.width / 2;
          const mageCenterY = rect.top + rect.height / 2;
          this.angle = Math.atan2(mouseY - mageCenterY, mouseX - mageCenterX);
      }
  }
  
  class Projectile {
      constructor(mageRect, angle) {
          this.element = document.createElement('div');
          this.element.classList.add('projectile');
          document.body.appendChild(this.element);
          this.element.style.left = `${mageRect.left + mageRect.width / 2}px`;
          this.element.style.top = `${mageRect.top + mageRect.height / 2}px`;
          this.speed = 10;
          this.angle = angle;
      }
  
      launch() {
          const interval = setInterval(() => {
              const rect = this.element.getBoundingClientRect();
              this.element.style.left = `${rect.left + Math.cos(this.angle) * this.speed}px`;
              this.element.style.top = `${rect.top + Math.sin(this.angle) * this.speed}px`;
  
              if (rect.left < 0 || rect.right > window.innerWidth || 
                  rect.top < 0 || rect.bottom > window.innerHeight) {
                  clearInterval(interval);
                  this.element.remove();
              }
          }, 20);
      }
  }
  
  const gameArea = document.getElementById('gameArea');
  const mageElement = document.createElement('div');
  mageElement.classList.add('mage');
  gameArea.appendChild(mageElement);
  
  const mage = new Mage(mageElement);
  
  document.addEventListener('keydown', (event) => {
      switch (event.key) {
          case 'w':
          case 's':
          case 'a':
          case 'd':
              mage.move(event.key);
              break;
          case 'e':
              mage.shoot();
              break;
      }
  });
  
  document.addEventListener('mousemove', (event) => {
      mage.updateAngle(event.clientX, event.clientY);
  });