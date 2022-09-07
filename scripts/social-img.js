//@ts-check
const nodeHtmlToImage = require('node-html-to-image')
const uuid = require('uuid')
const { format, parseJSON } = require('date-fns');

const html = `
<html>
  <head>
    <style>
      body {
        width: 1128px;
        height: 600px;
      }
    </style>

    <!-- Include external CSS, JavaScript or Fonts! -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">

    <style>
      :root {
        --tw-gradient-to: #ffe45e;
        --tw-gradient-from: #c91980;
        --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to,rgba(201,25,128,0));    
      }
      
      body {
        background-color: #0E1521;  
        font-family: 'Nunito', sans-serif;
      }

      .profile-img {
        box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
        background-image: linear-gradient(to bottom right,var(--tw-gradient-stops));
        padding: .25rem;
        border-radius: 9999px;
        display: inline-flex;
      }

      .tweet-text {
        font-weight: 800;
        color: transparent;
        font-size: 8rem;
        line-height: 1;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: linear-gradient(to bottom right,var(--tw-gradient-stops));
      }

      .tweet-date, .secondary-text {
        color: rgba(213,209,215);
      }

      .horizontal {
        background-color: rgba(64,69,81);
        width: 16.666667%;
        height: .25rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="p-4" style=" font-size: 20px; width: 1128px; height:600px;">
      <div class="d-flex flex-column justify-content-center" style="margin-left: 20px; height:100%; width:100%; border-radius:50px;">
        <div>
          <div class="profile-img">
            <div>
              <img src="https://www.eliostruyf.com/images/eliostruyf-november-2021.png" class="rounded-circle" width="150px">
            </div>
          </div>
        </div>

        <span class="tweet-text my-2" style="font-size: 52px;">
          {title}
        </span>

        <span class="tweet-date">
          {date}
        </span>

        <div class="horizontal">
          <div class="rounded-full inline-flex"></div>
        </div>

        <h4 class="secondary-text">Elio Struyf</h4>
        <span class="secondary-text">@eliostruyf</span>
      </div>
    </div>
  </body>
</html>
`;

const arguments = process.argv;

if (arguments && arguments.length > 0 && arguments[2]) {
  const workspaceArg = arguments[2];
  const fileArg = arguments[3];
  const dataArg = arguments[4];
  const data = dataArg && typeof dataArg === "string" ? JSON.parse(dataArg) : null;
  
  if (data.title && data.date) {
    const parsedHtml = html.replace(`{title}`, data.title).replace(`{date}`, format(parseJSON(data.date), "MMM dd, yyyy"));
    const fileName = `${uuid.v4()}.png`;

    // @ts-ignore
    nodeHtmlToImage({
      output: `${workspaceArg}/static/${fileName}`,
      html: parsedHtml
    }).then(() => console.log(`{"frontmatter": { "preview": "/social/${fileName}" }}`)).catch(e => console.log(e?.message || e));
  }
}