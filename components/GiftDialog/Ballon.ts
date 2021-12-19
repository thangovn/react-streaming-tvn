const randomNo = (num: number) => {
  return Math.floor(Math.random() * num)
}

const getRandomStyles = () => {
  var r = randomNo(255);
  var g = randomNo(255);
  var b = randomNo(255);
  var mt = randomNo(200);
  var ml = randomNo(50);
  var dur = randomNo(5) + 5;
  return {
    backgroundColor: `rgba(${r},${g},${b},0.7)`,
    color: `rgba(${r},${g},${b},0.7)`,
    boxShadow: `inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7)`,
    margin: `${mt}px 0 0 ${ml}px`,
    animation: `float ${4}s ease-in infinite`
  }
}


const ballon = {
  getRandomStyles
}

export default ballon