import React from 'react';
import { render } from 'react-dom';
import './styles.css';
import {
  BrowserRouter as Router,
  Redirect,
  NavLink as Link,
} from 'react-router-dom';

import KeyboardRoute from '../lib';

const DemoPage = ({ title, children }) => (
  <div className="page">
    <header className="page__title">
      <h2>{title}</h2>
    </header>
    <div className="page__content">{children}</div>
  </div>
);

const Table = ({ headers, data }) => (
  <table>
    <thead>
      <tr>
        {headers.map(header => <th key={`header-${header}`}>{header}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => {
        const keys = Object.keys(item);
        return (
          <tr key={`row-${index}`}>
            {keys.map(key => (
              <td key={`header-${index}-${key}`}>{item[key]}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

const Home = () => (
  <DemoPage title="Home">
    <h2 className="page__subtitle">
      This is a demo of React Router + Keyboardist
    </h2>

    <div className="about">
      <p>
        This fake dashboard was built using <code>React</code> and{' '}
        <code>React Router</code>, only that instead of using the built-in Route
        component it is using{' '}
        <a href="http://github.com/soska/react-router-plus-keyboardist">
          react-router-plus-keyboardist
        </a>{' '}
        <code>KeyboardRoute</code>.
      </p>

      <p>
        The reasoning for this is{' '}
        <a href="https://armandososa.org/2018/6/12/react-router-plus-keyboardist/">
          in this blog post
        </a>{' '}
        post and the code for this demo{' '}
        <a href="https://github.com/soska/react-router-plus-keyboardist/blob/master/src/docs/index.jsx">
          is right here on Github
        </a>{' '}
      </p>

      <p>
        You can always return to this screen by pressing <code>H</code> on your
        keyboard
      </p>
    </div>
  </DemoPage>
);
const Posts = () => (
  <DemoPage title="Posts">
    <div className="post-links">
      <Link className={'post-link'} to={'/posts/published'}>
        Show Published Posts <span>Shift + P</span>
      </Link>
      <Link className={'post-link'} to={'/posts/drafts'}>
        Show Drafts <span>Shift + D</span>
      </Link>
    </div>
    <KeyboardRoute
      path={'/posts'}
      exact
      render={() => <Redirect to={'/posts/published'} />}
    />
    <KeyboardRoute
      path="/posts/published"
      keyName={'Shift+KeyP'}
      exact={true}
      render={() => (
        <div>
          <h3 className={'page__subtitle'}>Published posts</h3>
          <Table
            headers={['Title', 'Comments', 'Status']}
            data={[
              {
                title: 'You are wrong. Here are 5 reasons why.',
                comments: 3,
                status: 'published',
              },
              { title: 'Hello World', comments: 10, status: 'published' },
            ]}
          />
        </div>
      )}
    />
    <KeyboardRoute
      path="/posts/drafts"
      keyName={'Shift+KeyD'}
      exact={true}
      render={() => (
        <div>
          <h3 className={'page__subtitle'}>Published posts</h3>

          <Table
            headers={['Title', 'Comments', 'Status']}
            data={[
              {
                title: 'Like Uber, but for Tacos',
                comments: 0,
                status: 'draft',
              },
            ]}
          />
        </div>
      )}
    />
  </DemoPage>
);

const Comments = () => (
  <DemoPage title="Comments">
    <div className="post-links">
      <Link className={'post-link'} to={'/comments/approved'}>
        Approved Comments <span>Shift + A</span>
      </Link>
      <Link className={'post-link'} to={'/comments/spam'}>
        Marked as Spam <span>Shift + S</span>
      </Link>
    </div>
    <KeyboardRoute
      path={'/comments'}
      exact
      render={() => <Redirect to={'/comments/approved'} />}
    />
    <KeyboardRoute
      path="/comments/approved"
      keyName={'Shift+KeyA'}
      exact={true}
      render={() => (
        <div>
          <h3 className={'page__subtitle'}>Approved Comments</h3>
          <Table
            headers={['Author', 'Comment', 'Status']}
            data={[
              {
                author: 'Scarlet J.',
                comment: 'I secretely love you.',
                status: 'approved',
              },
              {
                author: 'Bill G.',
                comment: 'This is brilliant.',
                status: 'approved',
              },
            ]}
          />
        </div>
      )}
    />
    <KeyboardRoute
      path="/comments/spam"
      keyName={'Shift+KeyS'}
      exact={true}
      render={() => (
        <div>
          <h3 className={'page__subtitle'}>Spam Comments</h3>
          <Table
            headers={['Author', 'Comment', 'Status']}
            data={[
              {
                author: 'Bruce',
                comment: 'I secretely hate you.',
                status: 'spam',
              },
            ]}
          />
        </div>
      )}
    />
  </DemoPage>
);
const Search = () => <DemoPage title="Comments">Search</DemoPage>;

let DemoApp = props => (
  <Router basename={'/react-router-plus-keyboardist'}>
    <div className="demo">
      <div className="nav">
        <Link to="/">
          <span>(H)</span>Home
        </Link>
        <Link to="/posts">
          <span>(P)</span>Posts
        </Link>
        <Link to="/comments">
          <span>(C)</span>Comments
        </Link>
      </div>
      <div className="main">
        <KeyboardRoute exact path="/" component={Home} keyName={'KeyH'} />
        <KeyboardRoute path="/posts" component={Posts} keyName={'KeyP'} />
        <KeyboardRoute path="/comments" component={Comments} keyName={'KeyC'} />
        <KeyboardRoute path="/search" component={Search} keyName={'KeyS'} />
      </div>
    </div>
  </Router>
);

render(<DemoApp />, document.getElementById('app'));
