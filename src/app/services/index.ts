import { NgModule } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { HospitalService } from './hospital.service';
import { UserService } from './user.service';
import { SampleService } from './sample.service';
import { ProjectService } from './project.service';
import { AnalyzePreDataService } from "./analyzePreData.service";
import { DepartmentService } from './department.service';
import { TaskResultService } from './taskResult.service';
import { CycleService } from './clearCycle.service';
import { DoctorService } from './doctor.service';
import { SampleTypeService } from './sampleType.service';
import { TissueTypeService } from './tissueType.service';
import { RefrigeratorService } from './refrigerator.service';
import { SampleBoxService } from './sampleBox.service';
import { ProjectSetService } from './projectSet.service';
import { TaskTypeSetService } from './taskTypeSet.service';
import { FamilySetService } from './familySet.service';
import { SampleContainerService } from './sampleContainer.service';
import { ExptaskService } from './exptask.service';
import { TaskDataService } from './taskData.service';
import { DatabaseService } from './database.service';
import { AnalyzeProcessService } from './analyzeProcess.service';
import { AnalyzeToolService } from './analyzeTool.service';

import { AnalyzeStaticsService } from './analyzeStatics.service';
import { MineService } from './mine.service';
import { SampleAttributeService } from './sampleAttribute.service';
import { FlowSetService } from './flowSet.service';
import { SopService } from './sop.service';
import { MessageService } from "./message.service";
import { WebUploaderService } from "./webUploader.service";
import { ReportService } from "./report.service";
import { RenderChartService } from "./renderChart.service";

const STATISTICS = [
    AnalyzeStaticsService,
    MineService,]



export {
    AuthService,
    HospitalService,
    UserService,
    SampleService,
    ProjectService,
    AnalyzePreDataService,
    DepartmentService,
    TaskResultService,
    CycleService,
    DoctorService,
    SampleTypeService,
    TissueTypeService,
    RefrigeratorService,
    SampleBoxService,
    ProjectSetService,
    TaskTypeSetService,
    FamilySetService,
    TaskDataService,
    AnalyzeToolService,
    AnalyzeStaticsService,
    MineService,
    SampleContainerService,
    SampleAttributeService,
    FlowSetService,
    SopService,
    MessageService,
    WebUploaderService,
    ReportService,
    RenderChartService
}

@NgModule()
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                AuthService,
                HospitalService,
                UserService,
                SampleService,
                ProjectService,
                AnalyzePreDataService,
                DepartmentService,
                TaskResultService,
                CycleService,
                DoctorService,
                SampleTypeService,
                TissueTypeService,
                RefrigeratorService,
                SampleBoxService,
                ProjectSetService,
                TaskTypeSetService,
                FamilySetService,
                SampleContainerService,
                ExptaskService,
                DatabaseService,
                AnalyzeProcessService,
                TaskDataService,
                AnalyzeToolService,
                AnalyzePreDataService,
                AnalyzeStaticsService,
                MineService,
                SampleAttributeService,
                FlowSetService,
                SopService,
                MessageService,
                WebUploaderService,
                ReportService,
                RenderChartService
            ]
        };
    }
}