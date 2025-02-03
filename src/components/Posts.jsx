import CreatePost from './CreatePost'
import GetPosts from './GetPosts';


function Posts() {
  return (
    <>
      <div className='container-fluid vw-100 d-flex align-items-center justify-content-around'>
            <div className='row vw-100'>
              {/* Left Column (Create Post) */}
              <div 
                className={`col-xl-5 col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center align-items-center position-relative`}
              >
                <CreatePost />
                <div className="vr position-absolute end-0 h-100 border border-secondary"></div>
              </div>

              {/* Right Column (Get Posts with Scrollbar) */}
              <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-center overflow-auto' style={{maxHeight: '100vh', height: '100%', overflowY: 'auto'}}>
                <div className="" style={{ maxHeight: '100vh' }}>
                  <GetPosts />
                </div>
              </div>
            </div>            
      </div>

    </>
  )
}

export default Posts
