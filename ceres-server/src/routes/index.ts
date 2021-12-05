import { Router } from 'express';
import authenticationRoutes from './authenticationRoute';
import departmentRoutes from './departmentRoute';
import departmentFormRoutes from './departmentFormRoute';
import formRoutes from './formRoute';
import formResponsesRoutes from './formResponsesRoute';
import imageRoutes from './imageRoute';
import caseStudyRoutes from './caseStudyRoute';
import caseStudiesRoutes from './caseStudiesRoute';
import caseStudyTypesRoutes from './caseStudyTypesRoute';
import caseStudyQuestionsRoutes from './caseStudyQuestionsRoute';
import caseStudyResponsesRoutes from './caseStudiesResponsesRoute';
import roleRoutes from './roleRoute';
import userRoutes from './userRoute';
import employeeOfTheMonthRoutes from './employeeOfTheMonthRoute';
import dataVizRoutes from './dataVizRoutes';
import messageBoardRoutes from './messageBoardRoute';
import todoRoutes from './todoRoute';
import emailRoutes from './emailRoute';
import forgotPasswordRoutes from './forgotPasswordRoute';
import passport from 'passport';

const authRouter = Router();
authRouter.use('/auth', authenticationRoutes);

const forgotPasswordRouter = Router();
forgotPasswordRouter.use('/forgot-password', forgotPasswordRoutes);

const apiRouter = Router();
// all routes below must be authenticated to be granted access
apiRouter.use(passport.authenticate('authAll', { session: false }));
apiRouter.use('/department', departmentRoutes);
apiRouter.use('/department-form', departmentFormRoutes);
apiRouter.use('/role', roleRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/form', formRoutes);
apiRouter.use('/form-responses', formResponsesRoutes);
apiRouter.use('/case-study', caseStudyRoutes);
apiRouter.use('/case-studies', caseStudiesRoutes);
apiRouter.use('/case-study-types', caseStudyTypesRoutes);
apiRouter.use('/case-study-questions', caseStudyQuestionsRoutes);
apiRouter.use('/case-study-responses', caseStudyResponsesRoutes);
apiRouter.use('/image', imageRoutes);
apiRouter.use('/employee-of-the-month', employeeOfTheMonthRoutes);
apiRouter.use('/dataviz', dataVizRoutes);
apiRouter.use('/messages', messageBoardRoutes);
apiRouter.use('/to-do', todoRoutes);
apiRouter.use('/email', emailRoutes);

const baseRouter = Router();
baseRouter.use(authRouter);
baseRouter.use(forgotPasswordRouter);
baseRouter.use(apiRouter);

export default baseRouter;
