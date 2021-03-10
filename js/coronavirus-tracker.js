import {
    render,
    html
} from 'https://unpkg.com/uhtml@2.1.1/esm/index.js?module';

const API_BASE = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';

const json = res => res.json();
const details = {
    headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': '53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53'
    }
};
const grabJSON = (url, details) => fetch(url, details).then(json);

const random = url => `${API_BASE}/${url}.php?_=${Math.random()}`;
const grabData = () => [
    grabJSON(random('worldstat'), details),
    grabJSON(random('cases_by_country'), details)
];

const boxWrapper = ({
    total_cases,
    total_deaths,
    total_recovered,
    new_cases,
    new_deaths
}) => html `
    <div class="row">
    </div>
`;

// country details
const countryTable = ({
        countries_stat
    }) => html `
<div class="row">
    <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4" id="table-card">                               
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-info">確診病例和死亡（按國家）</h6>                    
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="country-detail" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>國家</th>
                                <th>案例數</th>
                                <th>新案例數</th>
                                <th>死亡人數</th>
                                <th>新死亡人數</th>
                                <th>現有病例數</th>
                                <th>重症人數</th>
                                <th>康復人數</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${countries_stat.map(({
                                country_name,
                                cases,
                                new_cases,
                                deaths,
                                new_deaths,
                                active_cases,
                                serious_critical,
                                total_recovered
                            }) => html`
                                <tr>
                                    <td><b><i> ${ country_name } </i></b></td>
								    <td> ${ cases } </td>
								    <td><b class = "text-warning" > ${ new_cases } </b></td >
                                    <td> ${ deaths } </td>
                                    <td><b class = "text-danger"> ${ new_deaths } </b></td >
                                    <td> ${ active_cases } </td>
								    <td> ${ serious_critical } </td>
                                    <td> ${ total_recovered } </td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const visualize = ([{
        total_cases,
        total_deaths,
        total_recovered,
        new_cases,
        new_deaths,
    },
    {
        countries_stat
    }
]) => {
    render(document.body, html `
    <div id="content">
        <nav class="navbar navbar-expand navbar-light text-center bg-white topbar mb-4 static-top shadow">
            <div class="col-md-12">
                <h5 class="font-weight-bold text-uppercase mb-1" style="display: contents;">武漢肺炎（新型冠狀病毒）疫情追蹤器</h5>
            </div>
        </nav>
        <div class="container-fluid">    
            <div class="row">
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">病例總數</div>
                                        <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_cases}</div>
                                            </div>                                                    
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fa fa-users fa-2x text-info"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-3 mb-4">
                        <div class="card border-left-danger shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">死亡人數</div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_deaths}</div>
                                                </div>                                                
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-bed fa-2x text-danger"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-3 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">康復人數</div>
                                        <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${total_recovered}</div>
                                        </div>                                                    
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-child fa-2x text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">已確診</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${new_cases}</div>
                                        </div>                                                   
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-bell fa-2x text-warning"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            ${countryTable({countries_stat})}
        </div>
    `);
    setTimeout(update, 1000 * 60 * 10);
};

const update = () => Promise.all(grabData())
    .then(visualize, console.error);

addEventListener('DOMContentLoaded', update, {
    once: true
});