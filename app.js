const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
let allPokemon = require("./data");

const app = express();
app.use(express.json())
// -- Define your route listeners here! --

app.get("/pokemon/random", (req, res) => {

    let index = Math.round(Math.random() * allPokemon.length);
    return res.status(200).json(allPokemon[index]);
  });

/* app.get("/pokemon", (req, res) => {
  return res.status(200).json(allPokemon);
}); */

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  let pokeid = allPokemon.filter((element) => {
    return element.id == id;
  });

  return res.status(200).json(pokeid);
});

app.post('/pokemon/add', (req, res)=>{
    const form = req.body;
    console.log(req.body)
    allPokemon.push(form)
    return res.status(201).json(allPokemon)
})

app.delete('/pokemon/delete/:id',(req,res)=>{
    const {id} = req.params

   let newarray = allPokemon.filter((element)=>{
        return element.id !== id
    })

    allPokemon = newarray
    return res.status(200).json(allPokemon)
})



app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
