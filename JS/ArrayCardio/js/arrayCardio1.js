// Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

    const people = [
      'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
      'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
      'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
      'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
      'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
    ];

//================ Array.prototype.filter() ==========================

// 1. Filter the list of inventors for those who were born in the 1500's

    const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year <= 1599)
    
// const fifteen = inventors.filter(function(inventor) {
//   if( inventor.year >= 1500 && inventor.year <= 1599){
//     return true; //if true, pass into new array: 'inventor'
//   } // no need for else.
// });

    console.table(fifteen);

    
//================== Array.prototype.map() ===========================

// 2. Give us an array of the inventors first and last names

// map applies to every array item, filter only applies to select items.

    const fullNames = inventors.map(inventor => inventor.first + ' ' + inventor.last);

    console.table(fullNames);
    

//================== Array.prototype.sort() ==========================

// 3. Sort the inventors by birthdate, oldest to youngest

// compares each item to the other in an array
// (a, b), runs a function and return either 1(up) or -1(down)
// 'this is how we "bubble" things up or down an array order'

  // using a ternary operator: (if statement) ? (return statement) : (else statement).

    const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);

    // const ordered = inventors.sort(function(a, b){
    //   if(a.year > b.year) {
    //     return 1; //moves item up array
    //   } else {
    //     return -1; // moves item down array
    //   }
    // });

    console.table(ordered)


//================= Array.prototype.reduce() ==========================
 
// 4. How many years did all the inventors live all together?

// allow you to compute on each el in array
// instead of getting the total of all el's in array with a for loop i++...
// you can use .reduce()!!!

// arr.reduce((newTotal, item), initial value(*required));

    const totalYears = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year);
      // for each array item add the value of (inv.passed - inv.year) to total.
      // NEED 0 as last argument (current value) here otherwise total returns 'undefined'
    }, 0);

    console.log(totalYears);


// 5. Sort the inventors by years lived

    const oldest = inventors.sort(function(a,b){
      const lastGuy = a.passed - a.year;
      const nextGuy = b.passed - b.year;
      return lastGuy > nextGuy ? -1 : 1;
    });
    console.table(oldest);

    //   ... refactored with ternary ^^^
    //   if(lastGuy > nextGuy){
    //     return -1;
    //   } else {
    //     return 1;
    //   }
    // });

// // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

//       const category = document.querySelector('.mw-category');

//       // You don't have to call 'querySelector' on 'document',
//       // you can call on any existing DOM element.

//       // const links = category.querySelectorAll('a')

//       // !!!: chrome console gives error because we don't have 
//       // the '.map' function on the returned 'node list' object. We must
//       // change it from a 'node list' to an array...

//       const links = Array.from(category.querySelectorAll('a'));

//       // or use u83rl33t code ES6 'spread' operator: '...'.
//       // takes every item and puts it in new array.
//       // const links = [...category.querySelectorAll('a')];

//       // give us the text inside of each 'link'.
//       const de = links
//                   .map(link => link.textContent)
//                   .filter(streetName => streetName.includes('de'));




// 7. sort Exercise
// Sort the people alphabetically by last name

      // organized last name, first name:
      // const alpha = people.sort(function(lastOne, nextOne){
      //   // to sort we need to split first and last name from each item
      //   // split at ', '
      //   const [last, first] = lastOne.split(', ');
      //   // .split gives us an arr with each item containing the last name
      //   // and first name. we can put them in their own variables: 'last' and 'first'.
      //   console.log(last, first);
      // });

      // now sort the array alphabetically:
      const alpha = people.sort((lastOne, nextOne) => {
        const [aLast, aFirst] = lastOne.split(', ');
        const [bLast, bFirst] = nextOne.split(', ');
        return aLast > bLast ? 1 : -1;
      });
      console.log(alpha);

// 8. Reduce Exercise
// Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

    // since we don't want to set an initial value for every item we make
    // from this reduce function, we can use this if statement to do it for us.
    const transportation = data.reduce(function(obj, item) {
        if(!obj[item]){
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
    }, {})
