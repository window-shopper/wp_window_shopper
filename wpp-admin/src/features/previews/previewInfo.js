import React from 'react';

export default {
  0: {
    title: 'Basic',
    info: {
      hasItem: true,
      hasCta1: true,
      hasCta2: false,
      hasDescription: true,
      hasCaption: false,
      hasTitle: true,
      hasImage: true,
      hasBadge: true,
    },
    bulletPoints: ['covers most needs', 'leaves space for longer descriptions'],
    el: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 200,
        height: 195,
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      >
        <div style={{
          width: 145, height: 70, backgroundColor: 'rgba(204, 204, 204, 0.5)', margin: 12, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 12, backgroundColor: 'rgba(64, 64, 64, 0.6)', margin: 12, marginTop: 0, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 40, backgroundColor: 'rgba(64, 64, 64, 0.4)', margin: 12, marginTop: 0, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 12, display: 'flex', justifyContent: 'flex-end', margin: 12, marginTop: 0, right: 0,
        }}
        >
          <div style={{
            width: 50, height: 12, backgroundColor: 'rgba(0, 153, 255, 0.5)', borderRadius: 5,
          }}
          />
        </div>
      </div>
    ),
  },
  1: {
    title: 'Horizontal',
    info: {
      hasItem: true,
      hasCta1: true,
      hasCta2: false,
      hasDescription: true,
      hasCaption: false,
      hasTitle: true,
      hasImage: true,
      hasBadge: true,
    },
    bulletPoints: ['preferable for large, visually appealing images', 'comes with a caption', 'acts responsive on mobile despite it\'s width'],
    el: (
      <div style={{
        display: 'flex',
        width: 290,
        height: 140,
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      >
        <div style={{ flex: 1 }}>
          <div style={{
            width: 130, height: 92, backgroundColor: 'rgba(204, 204, 204, 0.5)', margin: 12, borderRadius: 5,
          }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            width: 110, height: 12, backgroundColor: 'rgba(64, 64, 64, 0.6)', margin: 12, borderRadius: 5,
          }}
          />
          <div style={{
            width: 110, height: 68, backgroundColor: 'rgba(64, 64, 64, 0.4)', margin: 12, marginTop: 12, borderRadius: 5,
          }}
          />
          <div style={{
            width: 110, height: 12, display: 'flex', justifyContent: 'flex-end', margin: 12, marginTop: 0, right: 0,
          }}
          >
            <div style={{
              width: 50, height: 12, backgroundColor: 'rgba(0, 153, 255, 0.5)', borderRadius: 5,
            }}
            />
          </div>
        </div>
      </div>
    ),
  },
  2: {
    title: 'Simple',
    info: {
      hasItem: true,
      hasCta1: true,
      hasCta2: false,
      hasDescription: false,
      hasCaption: false,
      hasTitle: true,
      hasImage: true,
      hasBadge: true,
    },
    bulletPoints: ['smaller in size', 'large emphasis on Call to Action button'],
    el: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 200,
        height: 195,
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      >
        <div style={{
          width: 145, height: 100, backgroundColor: 'rgba(204, 204, 204, 0.5)', margin: 15, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 12, backgroundColor: 'rgba(64, 64, 64, 0.6)', margin: 15, marginTop: 0, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 20, display: 'flex', justifyContent: 'center', margin: 15, marginTop: 0, right: 0,
        }}
        >
          <div style={{
            width: 90, height: 20, backgroundColor: 'rgba(0, 153, 255, 0.5)', borderRadius: 5,
          }}
          />
        </div>
      </div>
    ),
  },
  3: {
    title: 'Multi Action',
    info: {
      hasItem: true,
      hasCta1: true,
      hasCta2: true,
      hasDescription: true,
      hasCaption: true,
      hasTitle: true,
      hasImage: true,
      hasBadge: true,
    },
    bulletPoints: ['comes with a caption', 'two Call to Action buttons'],
    el: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 200,
        height: 195,
        backgroundColor: 'white',
        borderRadius: '5px',
      }}
      >
        <div style={{
          width: 135, height: 87, backgroundColor: 'rgba(204, 204, 204, 0.5)', margin: 11, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 11, backgroundColor: 'rgba(64, 64, 64, 0.6)', margin: 10, marginTop: 0, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 11, backgroundColor: 'rgba(64, 64, 64, 0.45)', margin: 11, marginTop: 0, borderRadius: 5,
        }}
        />
        <div style={{
          width: 145, height: 12, display: 'flex', justifyContent: 'center', margin: 11, marginBottom: 6, marginTop: 3, right: 0,
        }}
        >
          <div style={{
            width: '65%', height: 12, backgroundColor: 'rgba(0, 153, 255, 0.5)', borderRadius: 5,
          }}
          />
        </div>
        <div style={{
          width: 145, height: 12, display: 'flex', justifyContent: 'center', margin: 11, marginTop: 0, right: 0,
        }}
        >
          <div style={{
            width: '65%', height: 12, backgroundColor: 'rgba(0, 153, 255, 0.5)', borderRadius: 5,
          }}
          />
        </div>
      </div>
    ),
  },
};
