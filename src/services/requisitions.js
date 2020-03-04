
import axios from "axios"
import config from "./config"

// import { Container } from './styles';

const getMovieById =  async(id) => {
    var aux
    console.log(id)
    await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}&language=pt-BR`).then((res) => {
        console.log(res);
        aux = res.data
        console.log(aux)
    }).catch((err) => {
        console.log(err);
    });
    return (aux)
}
export default {getMovieById};

