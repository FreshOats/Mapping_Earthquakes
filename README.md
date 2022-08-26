# Mapping Earthquakes
### Creating Interactive Maps with GeoJSON Data
#### by Justin R. Papreck
---

## Overview
This project uses Leaflet to show earthquake data from the last 7 days, acquired from the USGS.gov website. The earthquakes are plotted showing the magnitued by color and size of the marker, along with presenting the location and magnitude upon clicking. A tectonic plate overlay was added to the map to look at the distribution of earthquakes along or not along the tectonic plate lines. While it was expected that most earthquakes would be along such lines, there were two places in the world where earthquakes occurred nowhere near such tectonic divisions. 

---
## Features
This project was coded with javascript with HTML and CSS. The data acquired from USGS.gov was in json format, as was the tectonic plate data acquired from the Github Repo: https://github.com/fraxen/tectonicplates, titled "PB2002_plates.json"

To run this program, an API call is required from Mapbox for integration with Leaflet. 

The Leaflet map allows the user to select from one of 4 map types: Satellite Images, Light, Night Mode, and Street maps, from Mapbox. Additionally, there are three overlays than can be selected to be active: all earthquakes measured in the past 7 days, tectonic plates, and major earthquakes in the last 7 days with a magnitude over 4.5.  

#### Satellite Image with all three overlays selected:

![World](https://user-images.githubusercontent.com/33167541/185512348-0c8e8748-c49b-47f5-a951-7967df08b7b2.png)


#### Light Background with all earthquakes and tectonic plates present: 

![Light_Plates](https://user-images.githubusercontent.com/33167541/185512460-d0a87391-4ed9-4d24-95e5-1c750622a58f.png)


#### Night Mode with only high magnitude earthquakes represented. The high magnitude earthquakes do not show the magnitude and location with interaction, this overlay is just to show the high magnitude events. 

![Night](https://user-images.githubusercontent.com/33167541/185512578-7ac85493-b21e-4a2b-a1f6-f7e1c4446ac3.png)


#### Street Mode with all earthquakes activated, showing the popup when a user clicks on the earthquake of interest.  

![Menu](https://user-images.githubusercontent.com/33167541/185512677-0ff0bc5a-20bb-43f1-84a9-ac324b0641d8.png)



---
## Analysis
The data presented for this analysis were acquired on 8/18/2022, representing the last 7 days of earthquake data from the USGS.gov site. Most of the earthquakes can be seen along or very near the tectonic plate divisions. 


![World](https://user-images.githubusercontent.com/33167541/185511032-f8df1dd2-4cc4-44dc-bb17-78155d4aaf2e.png)



What is interesting, however, are the two places in the world that seem to have earthquakes nowhere near the tectonic divisions. China had several higher magnitude earthquakes in the center of the country. Four of these were above a 4.5 magnitude. 



![China](https://user-images.githubusercontent.com/33167541/185511379-8b82c3ac-2b3d-41a7-b720-886aaa91c8a2.png)



The other country that really stood out was the United States with dozens of low magnitude earthquakes throughout the South and Midwest. Additionally, a belt extending from the Bering Strait up through Fairbanks had many low magnitude earthquakes. 



![USA](https://user-images.githubusercontent.com/33167541/185511670-91529069-e43f-4eaa-ac2d-7a5caa7bd13d.png)


  One likely explanation for the high number of measured earthquakes in the United States is the recording and reporting of such data, since the site that these data were retrieved from is a US government site. It may not be feasible to record as many low magnitude earthquakes in other parts of the world. Another interesting finding is the lack of earthquakes in Africa. There was not a single earthquake recorded on the continent in the past 7 days, with the closet being in the Mediterranean sea. To address some of these questions, further research into different earthquake recording groups worldwide would be helpful to at least determine whether the data is being recorded or even possible to measure. 
  

