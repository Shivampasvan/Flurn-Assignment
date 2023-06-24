import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import style from "../styles/Bookmarks.module.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import UseToast from '../customHooks/UseToast';
import { HStack, Image } from '@chakra-ui/react';


function BookmarksPage() {


  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const toastMsg = UseToast();

  function getFavorites() {
    setLoading(true);
    setFavoriteList(JSON.parse(localStorage.getItem("favorites")) || []);
    setLoading(false);
  }

  const handleDoFavorite = (pokemon) => {
    const index = favoriteList.indexOf(pokemon);
    if (index !== -1) {
      favoriteList.splice(index, 1);
      toastMsg({
        title: "Pokemon Removed from favorites",
        status: "warning"
      });
    } else {
      favoriteList.push(pokemon?.name);
      toastMsg({
        title: "Pokemon Added to favorites",
        status: "success"
      });
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteList))
    getFavorites()
  }

  useEffect(() => {
    getFavorites();
  }, [])
 
  return favoriteList.length == 0 ? <div className={style.emptyBookmark}><h1>Empty Bookmark try to add new Pokemon</h1> <Image src='https://static.vecteezy.com/system/resources/previews/004/968/502/non_2x/bookmark-social-media-content-save-icon-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg' width={"100%"} height={"100%"}></Image></div> : loading ? <h1>Loading...</h1> : (
    <div className={style.pokemons}>
      {
        favoriteList?.map((pokemon, i) => <article key={i} className={style.pokemon}>
          <Link to={`/pokemon/${pokemon}`}>
            <HStack>
              <p># {i + 1}</p>
              <h3>{pokemon}</h3>

            </HStack>
          </Link>
          <span onClick={() => handleDoFavorite(pokemon)}>{favoriteList.includes(pokemon) ? <FaBookmark /> : <FaRegBookmark />}</span>
        </article>)
      }
    </div>
  )
}

export default BookmarksPage