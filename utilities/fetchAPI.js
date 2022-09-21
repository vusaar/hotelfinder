import axios from 'axios';


export let fetchAPI = async(url)=>{

       let {data} = await axios.get(
        (url),
        {
            headers: {
              /* keys
              gmail
              333f2ec9e1msh4b8e199f254fd3dp18420bjsndaf7c881b06c
              gzu.ac
              69fbaa4786mshf1a4b1660ccac93p110361jsn4527369f82a0
              outlook
              a00c0a0c40mshbbba701edb4ca57p16ba3ejsn9e17e5e4fdec

              vusaar@oal
              a5f15b0fcdmsh04f32f71141a3abp1bf41ejsnf30eb9a4e1e0
              */
                'X-RapidAPI-Key': '333f2ec9e1msh4b8e199f254fd3dp18420bjsndaf7c881b06c',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
              }
        }
      ).catch(function (error){
        console.log(error);

         let errorData = {
             data : {error : "My bad, something went wrong"}
         };

          console.log(errorData);
        return errorData;
      });

     console.log(data);
      return data;
}