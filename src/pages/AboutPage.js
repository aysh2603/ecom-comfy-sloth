import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            quam nisi, ultricies ac tincidunt ut, dignissim quis purus. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Aenean ante mi, imperdiet eget lectus a, feugiat
            tempor quam. Phasellus arcu orci, bibendum in augue vitae, malesuada
            pellentesque arcu. Vivamus ligula arcu, blandit nec mi sit amet,
            porttitor sollicitudin risus. Aliquam in enim sed dui luctus sodales
            a vitae odio. Mauris et ligula tincidunt, scelerisque purus nec,
            varius tortor. Duis euismod nisl lorem, sed ultricies metus mollis
            vitae.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
