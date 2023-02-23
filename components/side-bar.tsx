import React from 'react';
import { linkedIn, github, pdf } from '../public/svg';

function SideBar() {
  return (
    <>
      <nav className='nav'>
        <div className='nav__sidebar'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <a href='about' className='nav__link'>
                About
              </a>
            </li>
            <li className='nav__item'>
              <a href='projects' className='nav__link'>
                Projects
              </a>
            </li>
            <li className='nav__item'>
              <a href='skills' className='nav__link'>
                Skills
              </a>
            </li>
            <li className='nav__item'>
              <a href='contact' className='nav__link'>
                Contact
              </a>
            </li>
            <div className='icons'>
              <a target='_blank' href='https://github.com/Juliasavransky/'>
                <svg className='icon'>
                  {/* <use xlink:href="./img/SVG/sprite.svg#icon-github"></use> */}
                  {/* <Image
                    src={github}
                    alt='Landscape picture'
                    width={800}
                    height={500}
                  /> */}
                </svg>
              </a>

              {/* <a href="https://www.linkedin.com/in/julia-savransky-perl/" target="_blank">    <svg className="icon">
                <use xlink:href="./img/SVG/sprite.svg#icon-linkedin2"></use>
              </svg></a> */}

              {/* <a href="https://bit.ly/34fcyP5" target="_blank">    <svg className="icon">
                <use xlink:href="./img/SVG/sprite.svg#icon-file-pdf"></use>
              </svg></a> */}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default SideBar;
