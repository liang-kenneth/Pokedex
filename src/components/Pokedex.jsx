import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  CircularProgress,
  Modal,
  TextField,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";
import PokeList from "./PokeList.jsx";
import Pokemon from "./Pokemon.jsx";
import generateKey from "../generateKey.js";

function Pokedex() {
  // ------------------------------------------------------------
  // Initialize useState variables
  const [pokemonList, setPokemonlist] = useState({});
  const [pokemonData, setPokemonData] = useState({
    id: "",
    name: "",
    species: { url: "", name: "" },
    height: "",
    weight: "",
    types: [],
  });
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  // ------------------------------------------------------------

  // Get the list of 150 pokemons on initial page load
  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=150").then(function (
      response
    ) {
      const { data } = response;
      const { results } = data;
      const newPokemonList = {};
      results.forEach((pokemon, index) => {
        newPokemonList[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });

      setPokemonlist(newPokemonList);
    });
  }, []);

  // ------------------------------------------------------------
  // Handle close of modal
  const handleClose = () => {
    setOpen(false);
    setPokemonData({
      id: "",
      name: "",
      species: { url: "", name: "" },
      height: "",
      weight: "",
      types: [],
    });
  };
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // Pokemon name search filter
  const handleSearch = (e) => {
    setFilter(e.target.value.toLowerCase());
  };
  // ------------------------------------------------------------

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", px: 2, my: 2 }}>
            <SearchIcon className="searchIcon" />
            <TextField
              label="Enter Pokemon"
              variant="standard"
              onChange={handleSearch}
              sx={{ width: "200px", mx: 1, input: { color: "white" } }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {pokemonList ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2, px: 2 }}
        >
          {Object.keys(pokemonList).map(
            (pokemonId) =>
              pokemonList[pokemonId].name.toLowerCase().includes(filter) && (
                <PokeList
                  key={generateKey(pokemonId)}
                  pokemonList={pokemonList}
                  pokemonId={pokemonId}
                  setOpen={setOpen}
                  setPokemonData={setPokemonData}
                />
              )
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
      {pokemonData ? (
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={open}
          onClose={() => handleClose()}
        >
          <Pokemon pokemonData={pokemonData} />
        </Modal>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Pokedex;
