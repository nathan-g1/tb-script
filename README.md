# Talubin-bin-script

This project contiains all the necessary scripts for a TaluBin device to be able to update its current status, mainly the weight of each compartment, the current speed, and the location, together with the images taken from the camera.

## Getting started

### How to deploy TaluBin script

Follow the following steps **thoroughly**.

1. Once there is `ssh` access to the TaluBin device, clone the project to a `home` directory

     ``` bash
    git clone https://gitlab.com/talubin/talubin-bin-script.git
    cd talubin-bin-script
    git branch -M main
    ```

2. Create `.env` file in the root directory
3. Copy and paste required contents from *responsible individuals* to `.env` file. It looks something like this

    ``` .env
    PORT=42000
    DATABASE_URI=DatabaseUri
    BIN_ID=binId
    ```

4. Locate the `binstatus.json` file to the root directory. This file structure looks like below

    ``` json
    {
        weight: {
            blue: 223,
            red: 234,
            other: 209.23
        },
        speed: 23,
        location: {
            long: 8.834,
            lati: 34.23
        }
    }
    ```

5. Create `images` folder in the root directory
6. Install dependencies `npm install`
7. Start the app `npm start`

### Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/-/experiment/new_project_readme_content:87cb3cf7357cd676a801c9d12e3926a1?https://docs.gitlab.com/ee/user/project/integrations/)

***
