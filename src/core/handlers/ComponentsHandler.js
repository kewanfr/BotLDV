const { readdirSync } = require('fs');

module.exports = async (client) => {
  const { log } = client;
  const componentFolders = readdirSync(`${process.cwd()}/src/client/components`);
  for(const folder of componentFolders){
    const componentFiles = readdirSync(`${process.cwd()}/src/client/components/${folder}`).filter(file => file.endsWith('.js'));

    const {buttons, selectMenus, modals} = client;

    switch(folder){
      case 'buttons':
        for(const file of componentFiles){
          const button = require(`${process.cwd()}/src/client/components/${folder}/${file}`);
          log.component(`- ${button.data.name}`, "BTN");
          buttons.set(button.data.name, button);
        }
        break;

      case "selectMenus":
        for(const file of componentFiles){
          const menu = require(`${process.cwd()}/src/client/components/${folder}/${file}`);
          log.component(`- ${menu.data.name}`, "MENU");
          selectMenus.set(menu.data.name, menu);
        }
        break;

      case "modals":
        for(const file of componentFiles){
          const modal = require(`${process.cwd()}/src/client/components/${folder}/${file}`);
          log.component(`- ${modal.data.name}`, "MODAL");
          modals.set(modal.data.name, modal);
        }
        break;

        case "features":
          for(const file of componentFiles){
            const feature = require(`${process.cwd()}/src/client/components/${folder}/${file}`);
            if(feature.data.buttons?.length > 0){
              for(const buttonName of feature.data.buttons){
                buttons.set(feature.data.name, feature);
              }
            }
            if(feature.data.selectMenus?.length > 0){
              for(const menuName of feature.data.selectMenus){
                selectMenus.set(feature.data.name, feature);
              }
            }
            if(feature.data.modals?.length > 0){
              for(const modalName of feature.data.modals){
                modals.set(feature.data.name, feature);
              }
            }
            log.component(`- ${feature.data.name}`, "FEATURE");
          }
          break;
        
      default:

        break;
    }
  }
};