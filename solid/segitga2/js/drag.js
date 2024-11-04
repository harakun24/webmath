
let isDragging = false;
const bottom = document.querySelector('.content');

let lastMoveUp = 0;
let lastMoveRight = 0;
let fnDrag = (e) => {
    isDragging = true;

    document.querySelector('.segitiga').style.cursor = 'grabbing';
    document.querySelector('.content').style.cursor = 'grabbing';

    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;

    const initialMarginLeft = parseInt(window.getComputedStyle(segitiga).marginLeft) || 0;
    const initialMarginTop = parseInt(window.getComputedStyle(segitiga).marginTop) || 0;

    const speedFactor = 1.2;

    const moveHandler = (moveEvent) => {
        if (!isDragging) return;

        const dx = ((moveEvent.clientX || moveEvent.touches[0].clientX) - startX) * speedFactor;
        const dy = ((moveEvent.clientY || moveEvent.touches[0].clientY) - startY) * speedFactor;
        const newMoveX = initialMarginLeft + dx;
        const newMoveY = initialMarginTop + dy;

        if ((segitiga.getBoundingClientRect().top > bottom.getBoundingClientRect().top || newMoveY > lastMoveUp) && (segitiga.getBoundingClientRect().bottom < bottom.getBoundingClientRect().bottom || newMoveY < lastMoveUp)) {

            segitiga.style.marginTop = `${newMoveY}px`;
            lastMoveUp = initialMarginTop + dy;
        }
        if ((segitiga.getBoundingClientRect().left > bottom.getBoundingClientRect().left || newMoveX > lastMoveRight) && (segitiga.getBoundingClientRect().right < bottom.getBoundingClientRect().right || newMoveX < lastMoveRight)) {

            segitiga.style.marginLeft = `${newMoveX}px`;
            lastMoveRight = initialMarginLeft + dx;
        }
    };

    const upHandler = () => {
        isDragging = false;
        // document.removeEventListener('mousemove', moveHandler);
        // document.removeEventListener('mouseup', upHandler);
        document.querySelector('.segitiga').style.cursor = 'grab';
        document.querySelector('.content').style.cursor = 'default';

        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
        document.removeEventListener('touchend', upHandler);

    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    document.addEventListener('touchend', upHandler);

    const animate = () => {
        if (isDragging) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}
document.querySelector('.segitiga').addEventListener('mousedown', fnDrag);
document.querySelector('.segitiga').addEventListener('touchstart', fnDrag);
