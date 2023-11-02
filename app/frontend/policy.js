import fs from 'fs';
import path from 'path';

const PlainHTMLPage = ({ rawHTML }) => {
  return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'policy.html');
  const rawHTML = await fs.promises.readFile(filePath, 'utf8');

  return {
    props: {
      rawHTML,
    },
  };
}

export default PlainHTMLPage;
