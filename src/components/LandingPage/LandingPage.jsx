import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

function LandingPage() {

    return (
      <div className={style.app}>
      <div className={style.nav} data-text="Cooking Food Recipes">
              Cooking Food Recipes 
      </div>
          <div className={style.containerLanding}>
              <div className={style.subtitleNav}>
                  <h3 className={style.subtitle}>
                      Find and create delicious recipes
                  </h3>
              </div>
              <div className={style.enter}>
                  <Link to='/home' className={style.enterButton}>Let us begin!</Link>
              </div>
          </div>
      <footer className={style.footer}>
          <h3>
              Technology Stack || ReactJs, Redux, Express, PostgreSQL, Sequelize
          </h3>
      </footer>    
  </div>
    );
  }

export default LandingPage;