function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

  luckyDraw('Joe')
  .then(res1 => console.log(res1))
  .then(()=>luckyDraw('Caroline'))
  .then(res2 => console.log(res2))
  .then(()=> luckyDraw('Sabrina'))
  .then(res3 => console.log(res3))
  .catch(err => console.error(err))