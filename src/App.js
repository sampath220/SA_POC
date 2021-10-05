import { useEffect, useState } from 'react';
import './App.css';
import _ from 'lodash';
import styled from 'styled-components';
import list from './common/list.json';
import data from './common/learning_tools.json';
import videoData from './common/video.json';

const List = styled.li`
    padding:8px;
    cursor:pointer;
    &:hover{
      background-color: #ed1233;
    }
`;

function App() {
  const [listData, setListData] = useState({});

  useEffect(() => {
    let data = list.data;
    console.log(_.groupBy(data, "type"));
    setListData(_.groupBy(data, "type"));
  }, [])
  let url = videoData.data.attributes.field_video.und[0].video_url;
  url = url.replace("watch?v=", "embed\/")

  return (
    <div className="App">
      <div style={{ margin: 20 }}>
        {Object.keys(listData || []).map((section, index) => {
          return (
            <div >
              <h1>{section}</h1>
              <ul key={index} style={{ border: '1px solid black', width: 170, textAlign: "center", padding: 24, listStyleType: 'none' }}>
                {
                  listData[section].map((list => {
                    return <List key={list.id}>{list.attributes.title}</List>;
                  }))
                }
              </ul>
            </div>)
        })
        }
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.data.attributes.body.und[0].value }}></div>
      <div dangerouslySetInnerHTML={{ __html: videoData.data.attributes.body.und[0].value }}></div>
      <div>
        <iframe
          width="853"
          height="480"
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div >
  );
}

export default App;
