import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div>
      <p>
        The Minnesota Kyudo Renmei is dedicated to the study and practice of modern kyudo, Japanese archery. Kyudo has been founded on both martial and spiritual influences, and encourages the development of body, mind and spirit.Carly and John Born began their study of kyudo while living in Japan and have continued their study ever since. Now we strive to improve our own skills while sharing the art with those who are interested.
      </p>
      <p>
        While kyudo is not well-known in the United States, there is a national organization and several state federations. The (AKR) is the parent organization to 8 state federations. In addition to the full-fledged state federations, there are several other organizations that have not yet attained federation status.
      </p>
    </div>
  </div>
);

export default AboutPage;
