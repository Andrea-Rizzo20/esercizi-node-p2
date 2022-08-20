
const surprisingFact = "The bumblebee bat is the world's smallest mammal";

console.log("SurprisingFact:", surprisingFact);
console.log({surprisingFact});
console.log("SurprisingFact: %s",surprisingFact);

const familyTree = [
    {
      name: "Person 1",
      children: [
        {
          name: "Person 2",
          children: [
            {
              name: "Person 3",
              children: [
                {
                  name: "Person 4",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  console.log(JSON.stringify(familyTree, null, 2));
  console.dir(familyTree, {depth: null});

  function importantTask() {
    console.count("importantTaskCount:")
  }

importantTask();
importantTask();
importantTask();
importantTask();
console.countReset("importantTaskCount:")
importantTask();
importantTask();