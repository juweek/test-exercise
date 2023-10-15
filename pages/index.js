/*
----------------------------------------
Import necessary components from @carbonplan node module
----------------------------------------
*/
import { Layout, Row, Column } from '@carbonplan/components';
import CountryData from './_countryData';

/*
----------------------------------------
Defines the Index functional component, which renders a simple webpage structure with Layout, Row, and Column components imported above. find more about the components here: https://github.com/carbonplan/components
----------------------------------------
*/
const Index = () => {
  return (
    <Layout>
      <Row sx={{ fontSize: [4, 5, 6, 7], my: [5, 6, 7, 8] }}>
        <Column start={[1, 2, 2, 2]} width={[6]}>
          This is a sample site
        </Column>
      </Row>
      <Row>
        <Column>
          <CountryData />
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
