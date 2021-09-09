import CatModel from '../models/cats.js'
import axios from 'axios';

async function createCat(args) {
    try {
        console.log(args)
        const { name, file, address, coordinates, breed, category, city } = args.cat
        const imgurRes = await axios({
            method: "POST",
            url: "https://api.imgur.com/3/image",
            headers: { 'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}` },
            data: {
                image: file,
            }
        })
        const cat = new CatModel({
            name,
            city,
            breed,
            category,
            url: imgurRes.data.data.link,
            coordinates: { longitude: coordinates.longitude, latitude: coordinates.latitude },
            createdAt: Date.now()
        })

        const newCat = await cat.save()

        return newCat
    } catch (error) {
        throw error;
    }
}

async function getCats(args) {
    try {
        const catsList = await CatModel.find().sort({ field: 'desc', createdAt: -1 })
        if (args) {
            catsList.limit(args)
            return catsList;
        } else {
            return catsList
        }
    } catch (error) {
        throw error;
    }
}



export { createCat, getCats }