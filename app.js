const players = document.querySelector('.players ');
const popupPlayer = document.querySelector('.popupPlayer');
const global=document.querySelector('.global');
const divplayers=document.querySelector('.div-players');
divplayers.addEventListener("mouseenter", () => {
    popupPlayer.style.display = "block";
});
divplayers.addEventListener("mouseleave", () => {
    popupPlayer.style.display = "none"
});

popupPlayer.addEventListener("mouseleave", () => {
    popupPlayer.style.display = "none"
});


