import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import classnames from "classnames";
import { Root, Content, ContentShift, FakeToolbar, Link } from './styles';  // Importing from styles.js

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import DashboardObra from "../../pages/dashboard/DashboardObra";
import Epis from "../../pages/tables/TableObraEpis";
import CardObra from "../../pages/tables/TableCards";
import Equipes from "../../pages/tables/TableEquipes";
import Colabs from "../../pages/tables/TableColabs";
import ColabsObra from "../../pages/tables/TableColabsObra";
import ColabDetails from "../../pages/tables/TableColabDetails";
import ColabServices from "../../pages/tables/TableColabServices";
import NewColab from "../../pages/forms/Criar";
import EditColab from "../../pages/forms/Edit";
import EquipeColab from "../../pages/forms/Equipe";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import TablesEpis from "../../pages/tables/TablesEpis";
import TableUsers from "../../pages/tables/TableUsers";
import Icons from "../../pages/icons/Icons";
import Charts from "../../pages/charts/Charts";
import ScrollToTop from "./ScrollToTop";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var layoutState = useLayoutState();  // Removed styles() and no longer use 'classes'

  return (
    <Root>  {/* Using styled components directly */}
      <>
        <Header history={props.history} />
        <ScrollToTop />
        <Sidebar />
        <Content
          className={classnames({
            [ContentShift]: layoutState.isSidebarOpened,
          })}
        >
          <FakeToolbar />
          <Routes>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/teste2" component={DashboardObra} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/tablesepis" component={TablesEpis} />
            <Route path="/app/obra/:board/:id" component={DashboardObra} />
            <Route path="/app/epis/:board" component={Epis} />
            <Route path="/app/equipes/:board/:id" component={Equipes} />
            <Route path="/app/cardobra/:board/:id" component={CardObra} />
            <Route path="/app/colabdetails/:id/:nome" component={ColabDetails} />
            <Route path="/app/colabservices/:obra_id/:id/:nome" component={ColabServices} />
            <Route path="/app/newcolab" component={NewColab} />
            <Route path="/app/editcolab/:id" component={EditColab} />
            <Route path="/app/equipecolab/:obra_id/:equipe" component={EquipeColab} />
            <Route path="/app/users" component={TableUsers} />
            <Route path="/app/colaboradores" component={Colabs} />
            <Route path="/app/colabsobra/:board/:obra_id" component={ColabsObra} />
            <Route path="/app/notifications" component={Notifications} />
            <Route exact path="/app/ui" render={() => <Navigate to="/app/ui/icons" />} />
            {/* <Route path="/app/ui/maps" component={Maps} /> */}
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Routes>
        </Content>
      </>
    </Root>
  );
}

export default Layout;
