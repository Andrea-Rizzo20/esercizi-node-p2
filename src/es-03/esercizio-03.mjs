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

  const getResults = async() =>{
    try{
        const result1 = await luckyDraw('Tina')
        const result2 = await luckyDraw('Jorge')
        const result3 = await luckyDraw('Julien')

        console.log(result1, result2, result3)
    }
    catch(err){
        console.error(err)
    }
  }

  getResults();

  const otherGetResults = async () =>{
    try{
        const results = await Promise.all([
            luckyDraw('Tina'),
            luckyDraw('Jorge'),
            luckyDraw('Julien')

        ])

        console.log(results)

    }
    catch(err){
        console.error(err)
    }
  }

  otherGetResults();