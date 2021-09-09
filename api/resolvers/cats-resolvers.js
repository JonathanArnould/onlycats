import CatModel from '../models/cats.js'

async function createCat(args) {
    try {
        const date = new Date();
        const { name, file, address } = args.cat
        const cat = new CatModel({ name, url: file, coordinates: { longitude: address, latitude: address }, createdAt: date })

        const newCat = await cat.save()
        return newCat
    } catch (error) {
        throw error;
    }
}

async function getCats(args) {
    try{
        if (args.limit) {
            const catsList = await CatModel.find().sort({field: 'desc', createdAt: -1}).limit(args.limit)
            return catsList;
        } else {
            const catsList = await CatModel.find().sort({field: 'desc', createdAt: -1})
            return catsList
        }
    } catch (error) {
        throw error;
    }
}

async function addToFavorites(args) {
    try{
        const { id } = args.fav
        const beforeUpdateCat = await CatModel.findOne({_id: id})

        const favoriteUpdate = !beforeUpdateCat.isFavorite
        const body = { isFavorite: favoriteUpdate };
        
        return CatModel.findOneAndUpdate({_id: id}, body);
    } catch (error) {
        throw error;
    }
}



export { createCat, getCats, addToFavorites };