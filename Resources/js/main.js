const images = document.getElementsByClassName("image");
const navBar = document.getElementById("nav-bar"); // Replace with your navbar's ID

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const isMouseOverNavBar = (x, y) => {
  const rect = navBar.getBoundingClientRect();
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

const handleOnMove = e => {
  if (isMouseOverNavBar(e.clientX, e.clientY)) {
    // Stop the trail and reset all images
    Array.from(images).forEach(image => {
      image.dataset.status = "inactive";
    });
    return; // Exit the function early if over the nav bar
  }

  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
